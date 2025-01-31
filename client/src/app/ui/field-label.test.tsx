import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';

import { Input, Checkbox, Textarea, Select } from './field-label';

describe('Input component', () => {
  test('renders Input component', () => {
    render(<Input id="test-input" label="Test Input" />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  test('updates value on change', () => {
    render(<Input id="test-input" label="Test Input" />);
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input).toHaveValue('new value');
  });

  test('displays error messages', () => {
    const errors = ['Error 1', 'Error 2'];
    render(<Input id="test-input" label="Test Input" error={errors} />);
    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });
});

describe('Checkbox component', () => {
  test('renders Checkbox component', () => {
    render(<Checkbox id="test-checkbox" label="Test Checkbox" />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  test('updates value on change', () => {
    render(<Checkbox id="test-checkbox" label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe('Textarea component', () => {
  test('renders Textarea component', () => {
    render(<Textarea id="test-textarea" label="Test Textarea" />);
    expect(screen.getByLabelText('Test Textarea')).toBeInTheDocument();
  });

  test('updates value on change', () => {
    render(<Textarea id="test-textarea" label="Test Textarea" />);
    const textarea = screen.getByLabelText('Test Textarea');
    fireEvent.change(textarea, { target: { value: 'new value' } });
    expect(textarea).toHaveValue('new value');
  });

  test('displays error messages', () => {
    const errors = ['Error 1', 'Error 2'];
    render(<Textarea id="test-textarea" label="Test Textarea" error={errors} />);
    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });
});

describe('Select component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ];

  test('renders Select component', () => {
    render(<Select id="test-select" label="Test Select" options={options} />);
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
  });

  test('updates value on change', () => {
    render(<Select id="test-select" label="Test Select" options={options} />);
    const select = screen.getByLabelText('Test Select');
    fireEvent.change(select, { target: { value: '2' } });
    expect(select).toHaveValue('2');
  });

  test('displays error messages', () => {
    const errors = ['Error 1', 'Error 2'];
    render(<Select id="test-select" label="Test Select" error={errors} options={options} />);
    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });
});
