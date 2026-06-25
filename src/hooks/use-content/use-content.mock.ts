import type { Content } from './use-content.types'

export const contentMock: Content = {
  homepage: [
    {
      id: '1',
      image: {
        src: 'https://picsum.photos/seed/content1/1280/720',
        alt: 'Image 1'
      },
      title: 'Lorem ipsum dolor sit amet consectetur',
      body: 'Molestiae sequi repellat delectus at placeat, ducimus laborum labore voluptatum blanditiis optio?'
    },
    {
      id: '2',
      image: {
        src: 'https://picsum.photos/seed/content2/1280/720',
        alt: 'Image 2'
      },
      title: 'Lorem ipsum dolor sit amet consectetur',
      body: 'Molestiae sequi repellat delectus at placeat, ducimus laborum labore voluptatum blanditiis optio?'
    },
    {
      id: '3',
      image: {
        src: 'https://picsum.photos/seed/content3/1280/720',
        alt: 'Image 3'
      },
      title: 'Lorem ipsum dolor sit amet consectetur',
      body: 'Molestiae sequi repellat delectus at placeat, ducimus laborum labore voluptatum blanditiis optio?'
    }
  ]
}
