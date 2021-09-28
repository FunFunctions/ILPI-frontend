import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

interface PatientModel {
  id: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  birthDate: Date,
}

interface Props {
  patients: PatientModel[]

}

const Patient: NextPage<Props> = ({ patients }) => (
  
  <ul>
    {patients.map((patient:PatientModel) => (
      <li key={patient.id}>{patient.firstName} {patient.lastName}</li>
    ))}
  </ul>
  
)


// This function gets called at build time
Patient.getInitialProps = async ({ req }) => {
  // Call an external API endpoint to get patients
  const res = await fetch('http://localhost:3000/patients')
  const patients:PatientModel[] = await res.json()

  // By returning { props: { patients } }, the Patient component
  // will receive `patients` as a prop at build time
  return {
    patients,
  }
}

export default Patient