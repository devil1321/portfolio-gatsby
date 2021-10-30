export interface ArticleNode{
    node:{
        title:string;
        subtitle:string;
        text:string;
    }
}

export interface SlideNode{
        category:string;
        slides:string[];
        articles:ArticleNode[]
}

