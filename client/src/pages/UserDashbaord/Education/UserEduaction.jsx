import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { useEducationStoreforPost } from '../../../Zustand/Education Store/useEducationStore'
export default function UserEducation() {

  const { isCreate, isLoading, handleCreate, handleDelete,handleUpdate} = useEducationStoreforPost()
  const [formData, setFormData] = useState({
    collegeName: '',
    branchName: '',
    passoutYear: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
              Showcase Your Academic Journey
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Highlight your college, branch, and year of graduation
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Education Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName" className="text-gray-300">College Name</Label>
                <Input 
                  id="collegeName" 
                  name="collegeName" 
                  placeholder="Enter your college name" 
                  value={formData.collegeName} 
                  onChange={handleChange} 
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchName" className="text-gray-300">Branch Name</Label>
                <Input 
                  id="branchName" 
                  name="branchName" 
                  placeholder="Enter your branch name" 
                  value={formData.branchName} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passoutYear" className="text-gray-300">Passout Year</Label>
                <Input 
                  id="passoutYear" 
                  name="passoutYear" 
                  placeholder="Enter your passout year" 
                  value={formData.passoutYear} 
                  onChange={handleChange} 
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 mt-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            
            onClick={()=>handleCreate(formData)}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            disabled={!isCreate} 
            onClick={()=>handleUpdate(formData)}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white" 
            disabled={!isCreate} 
            onClick={handleDelete}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
