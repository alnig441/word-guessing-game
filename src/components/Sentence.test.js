import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/svelte'
import Sentence from "../components/Sentence.svelte"

describe('Sentence', () => {

  test('shows the scrambled sentence when rendered', async () => {
    render(Sentence)
  })
})
