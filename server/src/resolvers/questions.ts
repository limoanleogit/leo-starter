import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { Questions } from "../entities/Questions"
import axios from "axios"
import * as bcrypt from "bcryptjs"
import { QuestionInput } from "../types"

@Resolver()
export class QuestionResolver{
    @Query(() => [Questions], { nullable: true })
    async questionsfunc() {
        const options = {
            method: 'GET',
            url: `${process.env.TMDB_API_URL}movie/popular?language=en-US&page=1`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        };
        try {
            const response = await axios.request(options);
            const hashquestion = await bcrypt.hash("Ce acteur fait-il parti de ce film ?", 12)
            if (response) {
                let res = []
                res = response.data?.results
                for (let i = 0; i < res.length; i++) {
                    let id = res[i].id
                    const options2 = {
                        method: 'GET',
                        url: `${process.env.TMDB_API_URL}movie/${id}/credits?language=en-US`,
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                        }
                    };
                    const response2 = await axios.request(options2)
                    if (response2) {
                        let res2 = []
                        res2 = response2.data?.cast
                         
                            const newQuestion = Questions.create({
                                film:  res[i].original_title,
                                filmImage: res[i].poster_path,
                                acteur: res2[0].original_name,
                                acteurImage: res2[0].profile_path,
                                questionhash: hashquestion
                            })
                            await newQuestion.save()
                    }
                    
                }
            }
        } catch (error) {
            throw new Error("Une erreur s'est produite lors du retours des informations")
        }
        return await Questions.find();
    }

    @Query(() => [Questions], { nullable: true })
    async getQuestion(): Promise<Questions[] | undefined> {
        const allQuestions = await Questions.find();
        if (!allQuestions || allQuestions.length === 0) {
            return undefined;
        }

        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());

        const halfLength = Math.floor(allQuestions.length / 2);
        const correctActorsQuestions = shuffledQuestions.slice(0, halfLength);
        const incorrectActorsQuestions = shuffledQuestions.slice(halfLength);

        incorrectActorsQuestions.forEach((question, index) => {
            const swapWithIndex = (index + halfLength) % allQuestions.length;
            question.acteur = allQuestions[swapWithIndex].acteur;
            question.acteurImage = allQuestions[swapWithIndex].acteurImage;
        });

        const shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
        };

        const mergeAndShuffle = (array1: any[], array2: any[]) => {
        const mergedArray = array1.concat(array2);
        return shuffle(mergedArray);
        };

        const combinearray = mergeAndShuffle(correctActorsQuestions, incorrectActorsQuestions)

        return combinearray;
    }

    @Mutation(() => [Boolean])
    async correctQuestions(@Arg("answers", () => [QuestionInput]) answers: QuestionInput[]): Promise<Boolean[]> {
        const tablequestion = await Questions.find();

        let correct = answers.map((answer) => {
            const matchingQuestion = tablequestion.some(question => question.acteur === answer.acteur && question.film === answer.film);
            const isCorrect = matchingQuestion && matchingQuestion === answer.isFilmChoice ? true : false;
            return isCorrect;
        });

        return correct;
    }

}