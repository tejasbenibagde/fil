import { Footer } from '@/components/layout/footer'
import { render } from '@testing-library/react'

describe('Footer', () => {
    it('should render Footer component', () => {
        const footer = render(<Footer />)
        
        expect(footer).toMatchSnapshot()
    })
})