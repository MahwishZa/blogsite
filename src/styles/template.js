'use client'

export default function getAllPosts() {
  return [
    {
      _id: '1',
      id: 'post-one',
      coverImage: '/img1.jpg',
      category: 'Code',
      title: 'Post One: Lorem ipsum dolor sit amet',
      date: 'Jun 21, 2021',
      createdAt: '2021-06-21T10:00:00Z',
      readTime: '11 min',
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed.",
      authorName: 'John Doe',
      aboutAuthor: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed.',
      description: [
        {
          subtitle: "Design Principles",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "Praesent in tortor eget lorem cursus malesuada..."
          ]
        },
        {
          subtitle: "Application",
          paragraphs: [
            "Aliquam erat volutpat. Vestibulum a arcu at nunc sodales tincidunt...",
            "Duis vel orci in purus convallis efficitur..."
          ]
        }
      ],
      comments: [
        {
          _id: 'c1',
          userName: 'Alice',
          createdAt: '2021-06-22T14:00:00Z',
          message: 'Great article, very insightful!'
        },
        {
          _id: 'c2',
          userName: 'Bob',
          createdAt: '2021-06-23T09:15:00Z',
          message: 'Loved the explanation on design principles.'
        }
      ]
    },
    {
      _id: '2',
      id: 'post-two',
      coverImage: '/img1.jpg',
      category: 'Design',
      title: 'Post Two: Lorem ipsum dolor sit amet',
      date: 'Aug 06, 2021',
      createdAt: '2021-08-06T08:30:00Z',
      readTime: '22 min',
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed.",
      authorName: 'Sarah Doe',
      aboutAuthor: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed.',
      description: [
        {
          subtitle: "Design Principles",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "Praesent in tortor eget lorem cursus malesuada..."
          ]
        },
        {
          subtitle: "Application",
          paragraphs: [
            "Aliquam erat volutpat. Vestibulum a arcu at nunc sodales tincidunt...",
            "Duis vel orci in purus convallis efficitur..."
          ]
        }
      ],
      comments: [
        {
          _id: 'c3',
          userName: 'Charlie',
          createdAt: '2021-08-07T11:20:00Z',
          message: 'Very detailed post, thanks!'
        }
      ]
    },
    {
      _id: '3',
      id: 'post-three',
      coverImage: '/img1.jpg',
      category: 'Tech',
      title: 'Post Three: Lorem ipsum dolor sit amet',
      date: 'Sep 03, 2021',
      createdAt: '2021-09-03T14:45:00Z',
      readTime: '15 min',
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed.",
      authorName: 'Chris Smith',
      aboutAuthor: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed.',
      description: [
        {
          subtitle: "Design Principles",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "Praesent in tortor eget lorem cursus malesuada..."
          ]
        },
        {
          subtitle: "Application",
          paragraphs: [
            "Aliquam erat volutpat. Vestibulum a arcu at nunc sodales tincidunt...",
            "Duis vel orci in purus convallis efficitur..."
          ]
        }
      ],
      comments: []
    }
    // Add more posts with comments if needed
  ]
}