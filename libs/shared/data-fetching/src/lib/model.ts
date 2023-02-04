export interface GithubSerializedSearch {
    total_count: number;
    items: GithubSerializedRepo[]
}

export interface GithubSerializedRepo {
    name: string;
    description: string;
}

export interface GithubRepoDTO extends GithubSerializedRepo{
    origin: string;
}

export interface GitlabSerializedRepo {
    name: string;
    description: string;
    topics: string[];
}

export interface GitlabRepoDto extends GitlabSerializedRepo{
    origin: string;
}

export interface DevtoSerializedArticle {
    canonical_url: string;
    cover_image: string;
    description: string;
    organization?: {
        name: string;
    }
    title: string;
    type_of: string;
}

export interface SlideData {
    title: string;
    subtitle?: string;
    image: string;
    content: string;
    link: string;
    origin?: string;
}
