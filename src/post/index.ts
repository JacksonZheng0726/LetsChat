export interface NewPost {
  content: string
  image: string
}

export interface Post {
  id: string
  member: string
  posted: Date
  content: string
  image?: string
  avatarUrl?: string;
}

export interface postInput {
  page: number
  size: number
}