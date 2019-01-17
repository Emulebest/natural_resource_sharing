import * as React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {WaterStore} from "../store/water";
import {WalletStore} from "../store/wallet";
import Modal from 'react-responsive-modal';
import {httpWithHeaders} from "../utils/custom_http";
import "../styles/wallet.css";

interface Props {

}

interface InjectedProps extends Props {
    water: WaterStore,
    wallet: WalletStore
}

@inject("water", "wallet")
// @ts-ignore
@withRouter
@observer
export class WaterWallet extends React.Component {
    state = {
        amount: 0,
        open: false
    };

    get injected() {
        return this.props as InjectedProps
    }

    add = async (amount: number) => {
        this.injected.water.add(amount);
        httpWithHeaders().put(`/water/${this.injected.water.id}/`, {
            quantity: this.injected.water.amount
        })
    };

    decrease = async (amount: number) => {
        this.injected.water.substract(amount);
        httpWithHeaders().put(`/water/${this.injected.water.id}/`, {
            quantity: this.injected.water.amount
        })
    };

    render() {
        return (

            <div>
            <div className="card-deck mb-3 text-center">
                <div className="card mb-4 shadow-sm">
                    <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Free</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
                        <ul className="list-unstyled mt-3 mb-4">
                            <li>10 users included</li>
                            <li>2 GB of storage</li>
                            <li>Email support</li>
                            <li>Help center access</li>
                        </ul>
                        <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free
                        </button>
                    </div>
                </div>

</div>
                <Modal onClose={() => {
                    this.setState({open: false})
                }} open={this.state.open}>
                    <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Purpose</h4></label>
                            <input type="number" className="form-control"
                                   placeholder="Number" onChange={(e) => {
                        this.setState({amount: parseFloat(e.target.value)})
                    }}/>
                            </div>
                    <div className="col-xs-6">
                    <br/>
                        <br/>
                    <button type="submit" className="btn btn-primary" onClick={() => this.add(this.state.amount)}>Add</button>
                        <button className="btn btn-primary" onClick={() => this.decrease(this.state.amount)}>Decrease</button>
                    </div>


                </Modal>
            </div>
        )
    }

    async componentDidMount(): Promise<void> {
        const res_water = await httpWithHeaders().get("/water/waters/");
        const res_wallet = await httpWithHeaders().get("/wallet/wallets/");
        this.injected.water.setAmount(res_water.data[0].quantity);
        this.injected.water.setId(res_water.data[0].id);
        this.injected.wallet.setAmount(res_wallet.data[0].balance);
        this.injected.wallet.setId(res_wallet.data[0].id);
        this.injected.wallet.address = res_wallet.data[0].address;
    }
}