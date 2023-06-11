import type { ITunesTypes } from '@/types/ItunesTypes.interface'

export const itunesSearch = async (search: string): Promise<ITunesTypes> => {
  return await fetch(`https://itunes.apple.com/search?term=${search}&entity=album`).then((value) =>
    value.json()
  )
}
