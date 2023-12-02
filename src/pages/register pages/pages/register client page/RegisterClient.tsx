import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  ConfirmRegisterButton,
  Message,
  Overlay,
  OverlayBackButton,
  OverlayContent,
  RegisterForm,
  RegisterFormError,
  RegisterPageContainer,
  RegisterPageLayout,
} from './styles'
import { api } from '../../../../services/api'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AxiosError } from 'axios'
import InputMask from 'react-input-mask'

const RegisterClientSchema = z.object({
  nome: z.string().min(1, 'É preciso preencher o nome do cliente'),
  email: z
    .string()
    .min(1, 'É preciso preencher o email do cliente')
    .email('Formato de email inválido'),
  celular: z.string().min(15, 'É preciso digitar um número de celular válido'),
})

type registerDataProps = z.infer<typeof RegisterClientSchema>

export function RegisterClient() {
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<registerDataProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(RegisterClientSchema),
  })

  const [message, setMessage] = useState<string | null>(null)

  const handleRegisterClient = async (data: registerDataProps) => {
    try {
      RegisterClientSchema.parse(data)

      const response = await api.post('/clientes', data)

      if (response.status === 201) {
        setMessage('Cliente cadastrado com sucesso!')
      } else {
        setMessage('Erro ao cadastrar cliente')
      }

      console.log(response.status)
    } catch (error) {
      console.error(error)

      if (isAxiosError(error)) {
        const axiosError = error as AxiosError

        if (axiosError.response) {
          const responseData = axiosError.response.data as { detail?: string }

          if (responseData.detail) {
            setMessage(`Erro ao cadastrar cliente: ${responseData.detail}`)
          } else {
            setMessage('Erro ao cadastrar cliente. Detalhes indisponíveis.')
          }
        } else if (axiosError.request) {
          setMessage(
            'Erro de comunicação com o servidor. Tente novamente mais tarde.',
          )
        } else {
          setMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.')
        }
      } else {
        setMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.')
      }
    }
  }

  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError !== undefined
  }

  const showOverlay = message !== null

  return (
    <>
      <RegisterPageLayout>
        <RegisterPageContainer>
          <h1>Cadastrar Cliente</h1>
          <RegisterForm
            id="register_form"
            onSubmit={handleSubmit(handleRegisterClient)}
          >
            <label>
              Nome
              <input id="nome" {...register('nome')} />
              {errors.nome && (
                <RegisterFormError>{errors.nome.message}</RegisterFormError>
              )}
            </label>

            <label>
              Email
              <input type="email" id="email" {...register('email')} />
              {errors.email && (
                <RegisterFormError>{errors.email.message}</RegisterFormError>
              )}
            </label>

            <label>
              Telefone
              <InputMask
                mask="(99) 99999-9999"
                maskChar="_"
                type="text"
                id="celular"
                {...register('celular')}
              />
              {errors.celular && (
                <RegisterFormError>{errors.celular.message}</RegisterFormError>
              )}
            </label>
          </RegisterForm>
          <ConfirmRegisterButton type="submit" form="register_form">
            Cadastrar
          </ConfirmRegisterButton>
        </RegisterPageContainer>
      </RegisterPageLayout>
      {showOverlay && (
        <Overlay>
          <OverlayContent>
            <Message>{message}</Message>
            <NavLink to="/cadastrar">
              <OverlayBackButton>Voltar</OverlayBackButton>
            </NavLink>
          </OverlayContent>
        </Overlay>
      )}
    </>
  )
}
