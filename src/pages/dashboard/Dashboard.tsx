import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import {
  DashboardLayout,
  TotalRevenueCard,
  RevenueByClientCard,
  RevenueByActivityCard,
  DivisionCardLine,
  ChooseTimePeriodBar,
  TimePeriodButton,
} from './styles'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { format, startOfMonth } from 'date-fns'
import { Loading } from '../../components/loading/Loading'
import { formatValue } from '../../services/format-value-service'
import { SummaryByClientResult } from './components/summary by client result/SummaryByClientResult'
import { ptBR } from 'date-fns/locale'
import { SummaryByActivityResult } from './components/summary by activity result/SummaryByActivityResult'

export interface atividadeValorListProps {
  atividade: string
  valor: number
}

export interface clienteValorListProps {
  cliente: string
  valor: number
}

interface SummaryProps {
  valor: number
  atividadeValorList: atividadeValorListProps[]
  clienteValorList: clienteValorListProps[]
}

interface EvolutionSummaryProps {
  ano: number
  mes: number
  valor: number
}

export function Dashboard() {
  const [summary, setSummary] = useState<SummaryProps>()

  const [evolutionSummary, setEvolutionSummary] = useState<
    EvolutionSummaryProps[]
  >([])

  const [months, setMonths] = useState<string[]>([])

  const [isSixMonthsTimePeriodActive, setIsSixMonthsTimePeriodActive] =
    useState<boolean>(true)

  const [isThreeMonthsTimePeriodActive, setIsThreeMonthsTimePeriodActive] =
    useState<boolean>(false)

  const [isYearTimePeriodActive, setIsYearTimePeriodActive] =
    useState<boolean>(false)

  const [timePeriodText, setTimePeriodText] = useState('Últimos seis meses')

  const getSummary = async () => {
    try {
      const today = new Date()
      const firstDayOfMonth = startOfMonth(today)

      const formattedToday = format(today, 'yyyy-MM-dd')
      const formattedFirstDay = format(firstDayOfMonth, 'yyyy-MM-dd')

      const response = await api.get(
        `/resumo?dataIni=${formattedFirstDay}&dataFim=${formattedToday}`,
      )

      console.log(response)

      if (response.status === 200) {
        setSummary(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getLastSixMonthsSummary = async () => {
    setIsSixMonthsTimePeriodActive(true)
    setIsThreeMonthsTimePeriodActive(false)
    setIsYearTimePeriodActive(false)

    setTimePeriodText('Últimos seis meses')

    const currentDate = new Date()

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 5,
      1,
    )

    const endDate = currentDate

    const monthsArray = []
    let currentDatePointer = startDate

    while (currentDatePointer <= endDate) {
      const monthLabel = format(currentDatePointer, 'MMM', { locale: ptBR })
      monthsArray.push(monthLabel)
      currentDatePointer = new Date(
        currentDatePointer.getFullYear(),
        currentDatePointer.getMonth() + 1,
        1,
      )
    }

    setMonths(monthsArray)

    const response = await api.get(
      `/resumo?dataIni=${format(startDate, 'yyyy-MM-dd')}&dataFim=${format(
        endDate,
        'yyyy-MM-dd',
      )}`,
    )

    console.log(response)

    if (response.status === 200) {
      setEvolutionSummary(response.data.faturamentoMesList)
    }
  }

  useEffect(() => {
    getSummary()
    getLastSixMonthsSummary()
  }, [])

  const getLastYearSummary = async () => {
    setIsSixMonthsTimePeriodActive(false)
    setIsThreeMonthsTimePeriodActive(false)
    setIsYearTimePeriodActive(true)

    setTimePeriodText('Último ano')

    const currentDate = new Date()

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 11,
      1,
    )

    const endDate = currentDate

    const monthsArray = []
    let currentDatePointer = startDate

    while (currentDatePointer <= endDate) {
      const monthLabel = format(currentDatePointer, 'MMM', { locale: ptBR })
      monthsArray.push(monthLabel)
      currentDatePointer = new Date(
        currentDatePointer.getFullYear(),
        currentDatePointer.getMonth() + 1,
        1,
      )
    }

    setMonths(monthsArray)

    const response = await api.get(
      `/resumo?dataIni=${format(startDate, 'yyyy-MM-dd')}&dataFim=${format(
        endDate,
        'yyyy-MM-dd',
      )}`,
    )

    console.log(response)

    if (response.status === 200) {
      setEvolutionSummary(response.data.faturamentoMesList)
    }
  }

  const getLastThreeMonthsSummary = async () => {
    setIsSixMonthsTimePeriodActive(false)
    setIsThreeMonthsTimePeriodActive(true)
    setIsYearTimePeriodActive(false)

    setTimePeriodText('Últimos três meses')

    const currentDate = new Date()

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 2,
      1,
    )

    const endDate = currentDate

    const monthsArray = []
    let currentDatePointer = startDate

    while (currentDatePointer <= endDate) {
      const monthLabel = format(currentDatePointer, 'MMM', { locale: ptBR })
      monthsArray.push(monthLabel)
      currentDatePointer = new Date(
        currentDatePointer.getFullYear(),
        currentDatePointer.getMonth() + 1,
        1,
      )
    }

    setMonths(monthsArray)

    const response = await api.get(
      `/resumo?dataIni=${format(startDate, 'yyyy-MM-dd')}&dataFim=${format(
        endDate,
        'yyyy-MM-dd',
      )}`,
    )

    console.log(response)

    if (response.status === 200) {
      setEvolutionSummary(response.data.faturamentoMesList)
    }
  }

  const chartSeries = [
    {
      name: 'Faturamento',
      data: evolutionSummary.map((data) => data.valor),
    },
  ]

  const chartOptions: ApexOptions = {
    chart: {
      height: 300,
      width: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true,
      },
    },
    colors: ['#047ECF'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: '',
      align: 'left',
      style: {
        fontSize: '0.7rem',
        fontFamily: 'Inter, sans-serif',
        color: '#263238',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    tooltip: {
      style: {
        fontSize: '0.9rem',
        fontFamily: 'Inter, sans-serif',
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: months,
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '0.92rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
        },
      },
      offsetX: 5,
      offsetY: 5,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '0.85rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
        },
        formatter: function (value: number) {
          return `R$ ${value.toFixed(0)}`
        },
      },
    },
  }

  if (!summary) {
    return <Loading />
  }

  const sortedAtividades = [...summary.atividadeValorList].sort(
    (a, b) => b.valor - a.valor,
  )

  const sortedClientes = [...summary.clienteValorList].sort(
    (a, b) => b.valor - a.valor,
  )

  const valueInReais = formatValue(summary.valor)

  return (
    <DashboardLayout>
      <TotalRevenueCard>
        <div className="total_revenue">
          <div>
            <h1 className="total_revenue_title">Faturamento</h1>
            <p id="time_tag">Este mês</p>
          </div>
          <span className="total_revenue_value">{valueInReais}</span>
        </div>

        <div id="card_line_container">
          <DivisionCardLine />
        </div>

        <h1 className="evolution_title">Evolução</h1>
        <p id="evolution_time_tag">{timePeriodText}</p>

        <ReactApexChart
          id="chart"
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={250}
          width={350}
        />

        <ChooseTimePeriodBar>
          <TimePeriodButton
            active={isThreeMonthsTimePeriodActive}
            onClick={getLastThreeMonthsSummary}
          >
            3 meses
          </TimePeriodButton>
          <TimePeriodButton
            active={isSixMonthsTimePeriodActive}
            onClick={getLastSixMonthsSummary}
          >
            6 meses
          </TimePeriodButton>
          <TimePeriodButton
            active={isYearTimePeriodActive}
            onClick={getLastYearSummary}
          >
            1 ano
          </TimePeriodButton>
        </ChooseTimePeriodBar>
      </TotalRevenueCard>

      <RevenueByClientCard>
        <h1 id="card_title">Por cliente</h1>

        <p id="time_tag">Este mês</p>

        <div id="revenue_by_client_results">
          {sortedClientes.map((client) => {
            return (
              <SummaryByClientResult
                key={client.cliente}
                cliente={client.cliente}
                valor={client.valor}
              />
            )
          })}
        </div>
      </RevenueByClientCard>

      <RevenueByActivityCard>
        <h1 id="card_title">Por atividade</h1>

        <p id="time_tag">Este mês</p>

        <div id="revenue_by_activity_results">
          {sortedAtividades.map((atividade) => {
            return (
              <SummaryByActivityResult
                key={atividade.atividade}
                atividade={atividade.atividade}
                valor={atividade.valor}
              />
            )
          })}
        </div>
      </RevenueByActivityCard>
    </DashboardLayout>
  )
}
