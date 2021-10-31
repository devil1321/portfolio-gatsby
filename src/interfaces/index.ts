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
export interface ServiceProps {
    id:string;
    icon:string;
    number:string;
    title:string;
    text:string;
    handleService:any
}