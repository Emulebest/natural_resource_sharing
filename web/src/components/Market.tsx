import * as React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { MarketStore } from "../store/market";
import Modal from 'react-responsive-modal';
import { httpWithHeaders } from "../utils/custom_http";
import { LoggedStore } from "../store/logged";


interface Props {

}

interface InjectedProps extends Props {
    market: MarketStore,
    logged: LoggedStore
}

@inject("market", "logged")
// @ts-ignore
@withRouter
@observer
export class Market extends React.Component {
    get injected() {
        return this.props as InjectedProps
    }

    state = {
        name: "",
        author: "",
        num_pages: null,
        num_symbols: null,
        pub_house: "",
        open: false,
        file: null
    };

    close = () => {
        this.setState({ activeModal: null })
    };

    handleChange = (file: File) => {
        this.setState({ file })
    };

    createBook = async () => {
        const res = await httpWithHeaders().post("/book/books/", {
            name: this.state.name,
            author: this.state.author,
            num_pages: this.state.num_pages,
            num_symbols: this.state.num_symbols,
            pub_house: this.state.pub_house,
        });
        const fd = new FormData();
        fd.append("file", this.state.file);
        fd.append("book", res.data.id);
        await httpWithHeaders().post("/book/upload/", fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    };

    read = async (id: number) => {
        const res = await httpWithHeaders().get(`/book/read/${id}/`)
    };


    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={ () => this.setState({ open: true }) }>New book</button>
                <Modal onClose={ () => this.setState({ open: false }) } open={ this.state.open }>
                    <div>
                        <input type="text" placeholder="Name"
                               onChange={ (e) => this.setState({ name: e.target.value }) }/>
                        <input type="text" placeholder="Author"
                               onChange={ (e) => this.setState({ author: e.target.value }) }/>
                        <input type="text" placeholder="Number of pages"
                               onChange={ (e) => this.setState({ num_pages: parseInt(e.target.value) }) }/>
                        <input type="text" placeholder="Number of symbols"
                               onChange={ (e) => this.setState({ num_symbols: parseInt(e.target.value) }) }/>
                        <input type="text" placeholder="Publishing house"
                               onChange={ (e) => this.setState({ pub_house: e.target.value }) }/>
                        <input type="file" onChange={ (e) => this.handleChange(e.target.files[0]) }/>
                        <button className="btn btn-primary" onClick={ () => this.createBook() }>Submit</button>
                    </div>
                </Modal>
                { this.injected.market.books.map(request => {
                    return (
                        <div>
                            <h4>Name: { request.name }</h4>
                            <h4>Author: { request.author }</h4>
                            <h4>Number of pages: { request.num_pages }</h4>
                            <h4>Number of symbols: { request.num_symbols }</h4>
                            <h4>Publishing house: { request.pub_house }</h4>
                            <button onClick={() => this.read(request.id)}> Read book on device</button>
                        </div>
                    )
                }) }
            </div>
        )
    }

    async componentDidMount(): Promise<void> {
        await this.injected.market.getBooks();
    }
}