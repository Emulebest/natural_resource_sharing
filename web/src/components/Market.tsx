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
        activeModal: null,
        active: [],
        open: false,
        mode: "",
        price: null,
        amount: null
    };

    close = () => {
        this.setState({ activeModal: null })
    };

    sendTransaction = async (id: number) => {
        await this.injected.market.sendTransaction(id)
    };

    filter = (mode) => {
        this.setState({ active: this.injected.market.getActive(this.injected.logged.current_username) });
        const items = this.state.active.filter(item => item.mode === mode);
        this.setState({ active: items })
    };

    createRequest = async () => {
        await httpWithHeaders().post("/transaction/transactions/", {
            mode: this.state.mode,
            price: this.state.price,
            amount: this.state.amount
        })
    };


    render() {
        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-sm-4">
                        <button className="btn btn-primary" onClick={ () => this.filter("buy") }>Buy</button>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-primary" onClick={ () => this.filter("sell") }>Sell</button>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-primary" onClick={ () => this.setState({ open: true }) }>New water
                            request
                        </button>
                    </div>
                </div>

                <Modal onClose={ () => this.setState({ open: false }) } open={ this.state.open }>
                    <input type="text" placeholder="mode" onChange={ (e) => this.setState({ mode: e.target.value }) }/>
                    <input type="number" onChange={ (e) => this.setState({ price: parseFloat(e.target.value) }) }/>
                    <input type="number" onChange={ (e) => this.setState({ amount: parseFloat(e.target.value) }) }/>
                    <button onClick={ () => this.createRequest() }>Submit</button>
                </Modal>
                { this.state.active.map(request => {
                    return (
                        <div>
                            <h4>Owner: { request.owner.username }</h4>
                            <h4>Buy/Sell: { request.mode }</h4>
                            <h4>Amount of water to transfer: { request.amount }</h4>
                            <h4>Price for liter in ETH: { request.price }</h4>
                            <button
                                onClick={ () => this.setState({ activeModal: request.id }) }>{ request.mode === "sell" ? "buy" : "sell" }ing?
                            </button>
                            <Modal onClose={ this.close } open={ this.state.activeModal === request.id }>
                                <h2>Are you sure?</h2>
                                <button onClick={ () => this.sendTransaction(request.id) }>Yes</button>
                                <button onClick={ () => this.close }>No</button>
                            </Modal>
                        </div>
                    )
                }) }
            </div>
        )
    }

    async componentDidMount(): Promise<void> {
        await this.injected.market.getPending();
        this.setState({ active: this.injected.market.getActive(this.injected.logged.current_username) })
    }
}