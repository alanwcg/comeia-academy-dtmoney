import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { useTransactions } from '../../hooks/useTransactions';

import {
  Container,
  TransactionTypeContainer,
  RadioBox,
  Error,
} from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface FormData {
  title: string;
  amount: number;
  category: string;
}

type TransactionType = 'deposit' | 'withdraw';

const schema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  amount: yup.string().required('Preço é obrigatório'),
  category: yup.string().required('Categoria é obrigatória')
});

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const [type, setType] = useState<TransactionType>('deposit');

  async function handleCreateNewTransaction(data: FormData) {
    await createTransaction({
      ...data,
      type,
    });

    setType('deposit');

    reset();

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <h2>Cadastrar transação</h2>

        <input
          className={errors.title && 'hasError'}
          placeholder="Título"
          {...register('title')}
        />
        {errors.title && <Error>{errors.title.message}</Error>}

        <input
          className={errors.amount && 'hasError'}
          type="number"
          placeholder="Preço"
          {...register('amount')}
        />
        {errors.amount && <Error>{errors.amount.message}</Error>}

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          className={errors.category && 'hasError'}
          placeholder="Categoria"
          {...register('category')}
        />
        {errors.category && <Error>{errors.category.message}</Error>}

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}