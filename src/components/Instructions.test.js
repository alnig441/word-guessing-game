import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/svelte'
import Instructions from "../components/Instructions.svelte";

describe('Instructions', () => {
  test('shows the game instructions when rendered', () => {
    const {getByText} = render(Instructions)
    expect(getByText('Guess the sentence! Start typing')).toBeInTheDocument()
    expect(getByText('The yellow blocks are meant for spaces')).toBeInTheDocument()
  })

})
