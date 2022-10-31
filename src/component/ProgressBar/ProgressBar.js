import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './ProgressBar.scss';

export class ProgressBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            circlesX: []
        }

        this.bar = React.createRef()
        this.changeCirclesOffset = this.changeCirclesOffset.bind(this)
    }

    componentDidMount() {
        this.changeCirclesOffset()
    }

    componentDidUpdate() {
        this.changeCirclesOffset()
    }

    changeCirclesOffset() {
        if (this.bar.current) {
            const circlesX = []
            this.bar.current.querySelectorAll('.ProgressBar__Circle').forEach(circle => {
                circlesX.push(circle.getBoundingClientRect().left)
            })
            circlesX.push(this.bar.current.getBoundingClientRect().width)

            this.setState(state => {
                if (state.circlesX[0] !== circlesX[0]) {
                    return {circlesX}
                }
            })
        }
    }

    renderMainLine() {
        const {allSteps, checkoutStep} = this.props
        const activeIndex = allSteps.findIndex(item => item.name === checkoutStep)

        const getCircleClass = (currentIndex) => {
            let res = 'ProgressBar__CircleWrapper'

            if (currentIndex > activeIndex) {
                res += ' ProgressBar__CircleWrapper_disabled'
            } else if (currentIndex === activeIndex) {
                res += ' ProgressBar__CircleWrapper_active'
            } else {
                res += ' ProgressBar__CircleWrapper_completed'
            }

            return res
        }

        const getInnerCircleContent = (currentIndex) => {
            if (currentIndex < activeIndex) {
                return ''
            }
            return currentIndex + 1
        }

        return (
            <>
                <div className='ProgressBar__Lines'>
                    <div className='ProgressBar__MainLine' ></div>
                    <div className='ProgressBar__ActiveLine' style={{width: this.state.circlesX[activeIndex]}}></div>
                </div>
                <div 
                    className='ProgressBar__Circles'
                    style={{gridTemplateColumns: `repeat(${allSteps.length - 1}, 1fr)`}}
                    >
                    {allSteps.map((step, index) => (
                        index < allSteps.length - 1 && 
                        <div className={getCircleClass(index)} key={step.name}>
                            <div className='ProgressBar__Circle'>
                                { getInnerCircleContent(index) }
                            </div>
                            <div className='ProgressBar__CircleLabel'>
                                {step.label}
                            </div>
                        </div>
                    ))}
                </div>
                
            </>
        )
    }

    render() {
        return (
            <div className='ProgressBar' ref={this.bar}>
                { this.renderMainLine() }
            </div>
        );
    }
}

export default ProgressBar;
