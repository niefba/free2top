import React from 'react';
import { render, screen } from '@testing-library/react';
import {describe, expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { Picto } from './picto';
import { WINTER_CATEGORIES } from "@/app/lib/constants";
import Image, { ImageProps } from "next/image";

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  default: (props: ImageProps) => <Image {...props} />
}));

describe('Picto component', () => {
  test('renders Picto component with summer category', () => {
    render(<Picto category="summer" />);
    expect(screen.getByAltText('Été')).toBeInTheDocument();
  });

  test('renders Picto component with winter category', () => {
    render(<Picto category={WINTER_CATEGORIES[0]} />);
    expect(screen.getByAltText('Hiver')).toBeInTheDocument();
  });

  test('renders Picto component with large size', () => {
    render(<Picto category="summer" large />);
    const image = screen.getByAltText('Été');
    expect(image).toHaveAttribute('width', '35');
    expect(image).toHaveAttribute('height', '35');
  });

  test('renders Picto component with default size', () => {
    render(<Picto category="summer" />);
    const image = screen.getByAltText('Été');
    expect(image).toHaveAttribute('width', '25');
    expect(image).toHaveAttribute('height', '25');
  });
});
