export enum Category {
    Thriller = "thriller",
    Horror = "horror",
    Action = "action",
    Romance = "romance",
    Adventure = "adventure",
    Drama = "drama",
    Western = "western",
    Animation = "animation",
    ScienceFiction = "science_fiction"
  }

  export type Movie = {
    id: number;
    title: string;
    description: string;
    category: Category,
    rating: number;
    releaseDate: Date;
}