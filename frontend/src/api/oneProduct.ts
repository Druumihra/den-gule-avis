import { Product } from "./Product";

export default async function oneProduct(id: string): Promise<Product> {
    if (id === "abcdefg") {
        // @ts-ignore
        const comments = window.globalVariablePostOneComments || [];

        const product: Product = {
            id: "abcdefg",
            title: "Lækker suger klar på sjov",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.SXRY_iHx7osacNRG5OaoQwHaGj%26pid%3DApi&f=1&ipt=604696780da861d33ea4f4e97f0d698b4db02009d82703c3970c533a6c456b5a&ipo=images",
            description: "lorem ipsum dolor sit amet",
            comments,
        };

        return product;
    } else {
        // @ts-ignore
        const comments = window.globalVariablePostTwoComments || [];

        const product: Product = {
            id,
            title: "min frø",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.expressandstar.com%2Fresizer%2FPCtZwaDauqKQPsqBeUiqNcy8p0k%3D%2F1200x0%2Ffilters%3Aquality(100)%2Farc-anglerfish-arc2-prod-expressandstar-mna.s3.amazonaws.com%2Fpublic%2FZMZ6ZSC2UJBOVI42ABZ3LHQ52A.jpg&f=1&nofb=1&ipt=c890ec2277cc3ed96587a43878cfea131178dfc5c0ecef52e7639e1d9ebb1a29&ipo=images",
            description: "lorem ipsum dolor sit amet",
            comments,
        };

        return product;
    }
}
