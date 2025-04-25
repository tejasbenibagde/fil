import { ProgressBar } from '@/components/layout/progress-bar'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom"


describe('ProgressBar', () => {
    it('should render ProgressBar', () => {
        render(<ProgressBar progress={0} />)

        const processing = screen.getByText(/processing/i)
        const progressPercent = screen.getByText(/0%/i)

        expect(processing).toBeInTheDocument()
        expect(progressPercent).toBeInTheDocument()
    })

    it('should upadte the progress percentage', () => {
        [1,2,3,4,5].forEach((percentVal) => {
            render(<ProgressBar progress={percentVal} />)

            const progressPercent = screen.getByText(new RegExp(percentVal.toString()))

            expect(progressPercent).toBeInTheDocument()
        })
    })
})