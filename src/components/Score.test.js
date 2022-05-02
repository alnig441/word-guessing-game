import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/svelte'
import Score from "../components/Score.svelte";

describe('Score', () => {
  test('shows overall score when rendered', () => {
    render(Score)
    const h2 = screen.getByText('Score:', {exact: false});
    expect(h2).toBeInTheDocument()
  })
})
