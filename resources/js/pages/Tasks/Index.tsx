import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button, buttonVariants } from '@/components/ui/button';
import { Task } from '@/types'
const Index = ({tasks}: {tasks: Task[]}) => {

    const deleteTask =(id:number) => {
        if(confirm('Are you sure?')){
            router.delete(route('tasks.destroy', {id}));
        }
    }
    return (
        <AppLayout>
            <Head title='Tasks List' />
            <Table className={'mt-4'}>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                         <TableRow>
                             <TableHead>Task</TableHead>
                             <TableHead className="w-[100px]">Status</TableHead>
                             <TableHead className="w-[150px] text-right">Actions</TableHead>
                         </TableRow>
                     </TableHeader>
                <TableBody>

                        {tasks.map((task:Task) =>(
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.name}</TableCell>
                                <TableCell className={task.is_completed ? 'text-green-600' : 'text-red-700'}>
                                     {task.is_completed ? 'Completed' : 'In Progress'}
                                </TableCell>
                                <TableCell className="flex flex-row gap-x-2 text-right">
                                     <Link className={buttonVariants({ variant: 'default' })} href={`/tasks/${task.id}/edit`}>
                                         Edit
                                     </Link>
                                     <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTask(task.id)}>
                                         Delete
                                     </Button>
                                 </TableCell>
                            </TableRow>
                        ))}

                </TableBody>
            </Table>

        </AppLayout>
    )
}

export default Index
