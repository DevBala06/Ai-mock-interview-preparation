'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutGrid, List } from "lucide-react"
import Header from '../_components/Header'
import { useRouter } from 'next/navigation'


interface InterviewData {
  _id: string
  jobRole: string
  technologies: string
  difficultyLevel: string
  createdAt: string
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const { user } = useUser()
  const router = useRouter()


  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('/api/generate-interview', {
          params: { userId: user?.id }
        });
        setInterviews(response.data.interviews);
      } catch (err) {
        setError('Failed to fetch interviews');
        console.error('Error fetching interviews:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchInterviews();
    }
  }, [user?.id]);

  if (loading) {
    return <div className="text-center mt-8">Loading interviews...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interviews.map((interview) => (
        <Card key={interview._id}>
          <CardHeader>
            <CardTitle>{interview.jobRole}</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className=" text-zinc-800 font-semibold">Technologies: <span className='text-zinc-700 font-medium'>{interview.technologies}</span> </h1>
            <h1 className=" text-zinc-800 font-semibold">Difficulty: <span className='text-zinc-700 font-medium'>{interview.difficultyLevel}</span></h1>
            <h1 className=" text-zinc-800 font-semibold">
              Created: <span className='text-zinc-700 font-medium'>{new Date(interview.createdAt).toLocaleDateString()}</span>
            </h1>
          </CardContent>
          <CardFooter>
            <Link href={`/dashboard/interviews/${interview._id}`}>
              <Button variant="default">Start Interview</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Role</TableHead>
          <TableHead>Technologies</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.map((interview) => (
          <TableRow key={interview._id}>
            <TableCell>{interview.jobRole}</TableCell>
            <TableCell>{interview.technologies}</TableCell>
            <TableCell>{interview.difficultyLevel}</TableCell>
            <TableCell>{new Date(interview.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Link href={`/dashboard/interviews/${interview._id}`}>
                <Button variant="default">Start Interview</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Interviews</h1>
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}
          >
            {viewMode === 'card' ? <List className="mr-2 h-4 w-4" /> : <LayoutGrid className="mr-2 h-4 w-4" />}
            {viewMode === 'card' ? 'Table View' : 'Card View'}
          </Button>
        </div>
        {interviews.length === 0 ? (
          <div className=' flex items-center justify-center border border-zinc-300'>
            <p className='text-lg text-zinc-700'>No interviews found. Create your first interview!</p>
          </div>
        ) : (
          viewMode === 'card' ? <CardView /> : <TableView />
        )}
      </div>
    </div>
  )
}