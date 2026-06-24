import type { Content } from './use-content.types'

export const contentMock: Content = {
  homepage: [
    {
      id: '1',
      image: {
        src: 'https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill',
        alt: 'Image 1'
      },
      title: 'Lorem ipsum dolor sit amet consectetur',
      body: 'Molestiae sequi repellat delectus at placeat, ducimus laborum labore voluptatum blanditiis optio?'
    },
    {
      id: '2',
      image: {
        src: 'https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill',
        alt: 'Image 2'
      },
      title: 'Lorem ipsum dolor sit amet consectetur',
      body: 'Molestiae sequi repellat delectus at placeat, ducimus laborum labore voluptatum blanditiis optio?'
    },
    {
      id: '3',
      image: {
        src: 'https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill',
        alt: 'Image 3'
      },
      title: 'Lorem ipsum dolor sit amet consectetur',
      body: 'Molestiae sequi repellat delectus at placeat, ducimus laborum labore voluptatum blanditiis optio?'
    }
  ]
}
