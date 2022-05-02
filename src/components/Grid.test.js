import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/svelte'
import Grid from "../components/Grid.svelte";

describe('Grid', () => {
  test('shows the game sheet when rendered', () => {
    render(Grid);
  })
})
