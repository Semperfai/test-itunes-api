
export const itunesSearch = async (search: string,limit:number) => {

 return await fetch(
    `https://itunes.apple.com/search?term=${search}&entity=album&limit=${limit}`
  ).then(value => value.json());
}