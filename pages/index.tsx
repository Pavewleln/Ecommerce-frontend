import {CardsFilter} from "@/components/ui/Home/CardsFilter";
import {MainLayout} from "@/components/layouts/MainLayout";
import {Card, ICard} from "@/components/ui/Home/Card";
import {SearchProduct} from "@/components/ui/Home/SearchProduct";
import {HomeSkeleton} from "@/components/ui/Skeletons/HomeSkeleton";

const HomePage = () => {
    const cards: ICard[] = [
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Iphone'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'IMac'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'IMac'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'IMac'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Nokia'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Nokia'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Nokia'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'IMac'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Iphone'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Iphone'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Iphone'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Xiaomi'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Xiaomi'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Xiaomi'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Xiaomi'
        },
        {
            _id: "laiuvbo783gv4,kadv",
            kol: 45,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
            price: 20000,
            title: "IMac",
            imageUrl: '../../../assets/images/image-1.jpg',
            type: 'Xiaomi'
        }
    ]
    const isLoading = false
    return (
        <MainLayout title={"Главная"}>
            {/*Появляется здесь после 800px*/}
            <div className={"block md:hidden"}>
                <CardsFilter cards={cards}/>
            </div>
            <SearchProduct/>
            {!isLoading
                ? <div className={"flex justify-around"}>
                    {cards ?
                        <>
                            {/*Исчезает после 800px*/}
                            <div className={"hidden md:block"}>
                                <CardsFilter cards={cards}/>
                            </div>
                            <div className={"flex items-center flex-wrap justify-center"}>
                                {cards.map((card) => (
                                    <Card key={card._id}
                                          title={card.title}
                                          _id={card._id}
                                          kol={card.kol}
                                          price={card.price}
                                          imageUrl={card.imageUrl}
                                          description={card.description}
                                          type={card.type}
                                    />
                                ))}
                            </div>
                        </>
                        : <h1>Произошла ошибка</h1>
                    }
                </div>
                : <HomeSkeleton/>
            }
        </MainLayout>
    )
}
export default HomePage