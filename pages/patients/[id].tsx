import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetStaticPaths } from 'next'

interface PatientModel {
  id: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  birthDate: Date,
}

interface Props {
  patient: PatientModel

}

const Patient: NextPage<Props> = ({ patient }) => { 
  let patientHTML;
  if (patient) {
    patientHTML = <li key={patient.id}>{patient.firstName} {patient.lastName}</li>;
  }
  return <ul>
    {patientHTML ? patientHTML : <div></div>}
  </ul>
  
}


// This function gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {

  let patientId = (context && context.params && context.params.id) || {};
  if (!patientId) {
    return {
      props: {
        
      },
    }
  }

  const res = await fetch(`http://localhost:3000/patients/${patientId}`)
  const patient:PatientModel = await res.json();

  return {
    props: {
      patient
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}
// Patient.getInitialProps = async ({ req }) => {
//   // Call an external API endpoint to get patients
//   const router = useRouter()
//   const { id } = router.query
//   const res = await fetch('http://localhost:3000/patients')
//   const patients:PatientModel[] = await res.json()

//   // By returning { props: { patients } }, the Patient component
//   // will receive `patients` as a prop at build time
//   return {
//     patients,
//   }
// }

export default Patient