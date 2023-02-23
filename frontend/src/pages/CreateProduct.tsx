
import { useFetcher } from "react-router-dom";
import Topbar from "../components/Topbar";
import "./createProduct.css";

function ErrorText(error: boolean) {
    if (error) {
        return <p>Der opstod en fejl.</p>
    } else {
        return <></>
    }
}

function CreateProduct() {
    const fetcher = useFetcher();
    const Form = fetcher.Form;

    return (
        <>
            <Topbar />
            <main className="cropped" id="create-product">
                <Form method="post" action="/create">
                    {ErrorText(fetcher.data === false)}
                    <label>Titel: <input name="title" type="text" /></label>
                    <label>Beskrivelse: <input name="description" type="text" /></label>
                    <label>Billede link: <input name="image" type="text" /></label>
                    <button type="submit" className="button">Skab</button>
                </Form>
            </main>
        </>
    );
}

export default CreateProduct;
