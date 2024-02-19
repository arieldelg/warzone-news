import dayjs from 'dayjs'

const generateDate = (month = dayjs().month()  , year = dayjs().year()) => {
 const firstDateofMonth = dayjs().year(year).month(month).startOf('month')   
 const lastDateofMonth = dayjs().year(year).month(month).endOf('month')   

 let array: object[] =[]

 for (let index = firstDateofMonth.date(); index <= lastDateofMonth.date(); index++) {
    array.push(firstDateofMonth.date(index))
    
 }
 return array
}

const nameMonths = [
   'Enero',
   'Febrero',
   'Marzo',
   'Abril',
   'Mayo',
   'Junio',
   'Julio',
   'Agosto',
   'Septiembre',
   'Octubre',
   'Noviembre',
   'Diciembre'
]

export { generateDate, nameMonths }