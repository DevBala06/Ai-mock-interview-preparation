import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const DashHeaderLoader = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-3">
                    <Skeleton className="h-10 w-[18rem] bg-white" />
                    <Skeleton className="h-10 w-10 rounded-full bg-white" />
                </div>
                <div>
                    <div className="flex items-center justify-center gap-5">
                        <div>
                            <Skeleton className="flex w-60 h-10 rounded-full items-center justify-center gap-3 bg-white px-4 py-1.5">
                                
                            </Skeleton>
                        </div>  
                        <Skeleton className="h-10 w-10 rounded-full bg-white"  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashHeaderLoader