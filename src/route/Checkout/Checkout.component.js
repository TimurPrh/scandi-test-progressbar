import ContentWrapper from '@scandipwa/scandipwa/src/component/ContentWrapper/ContentWrapper.component.js';
import ProgressBar from 'Component/ProgressBar/ProgressBar.js';
import { Checkout as SourceCheckout } from '../../../node_modules/@scandipwa/scandipwa/src/route/Checkout/Checkout.component.js'

import { SHIPPING_STEP, BILLING_STEP, DETAILS_STEP } from '../../../node_modules/@scandipwa/scandipwa/src/route/Checkout/Checkout.config'

class Checkout extends SourceCheckout {

    renderProgressBar() {
        const {
            checkoutStep
        } = this.props;

        const allSteps = [
            {
                name: SHIPPING_STEP,
                label: 'Shipping'
            },
            {
                name: BILLING_STEP,
                label: 'Review & Payments'
            },
            {
                name: DETAILS_STEP,
                label: ''
            }
        ]

        return <ProgressBar 
            checkoutStep={checkoutStep}
            allSteps={allSteps}
            />
    }

    render() {
        return (
            <main block="Checkout">
                { this.renderProgressBar() } 
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { this.renderSummary(true) }
                    <div block="Checkout" elem="Step">
                        { this.renderTitle() }
                        { this.renderGuestForm() }
                        { this.renderStep() }
                        { this.renderLoader() }
                    </div>
                    <div>
                        { this.renderSummary() }
                        { this.renderPromo() }
                        { this.renderCoupon() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default Checkout;