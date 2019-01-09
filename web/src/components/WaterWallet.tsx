import * as React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {WaterStore} from "../store/water";
import {WalletStore} from "../store/wallet";
import Modal from 'react-responsive-modal';
import {httpWithHeaders} from "../utils/custom_http";


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
                <h2>Your wallet balance: {this.injected.wallet.amount} ETH</h2>
                <h2>Your wallet address: {this.injected.wallet.address} </h2>
                <h2>Your water supply: {this.injected.water.amount} liters</h2>
                <button onClick={() => this.setState({open: true})}>Added more water?</button>
                <Modal onClose={() => {
                    this.setState({open: false})
                }} open={this.state.open}>
                    <input type="number" onChange={(e) => {
                        this.setState({amount: parseFloat(e.target.value)})
                    }}/>
                    <button onClick={() => this.add(this.state.amount)}>Add</button>
                    <button onClick={() => this.decrease(this.state.amount)}>Decrease</button>
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