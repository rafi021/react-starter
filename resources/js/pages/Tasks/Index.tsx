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
import { type BreadcrumbItem, type Task, type PaginatedResponse, } from '@/types';
import { toast } from 'sonner';

import { TablePagination } from '@/components/table-pagination';
 import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
];

const Index = ({tasks}: {tasks: PaginatedResponse<Task>}) => {

    const deleteTask =(id:number) => {
        if(confirm('Are you sure?')){
            router.delete(route('tasks.destroy', {id}));
            toast.success("Task Deleted successfully!");
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Tasks List' />
            <div className="mt-8">
                <Link className={buttonVariants({variant: 'outline'})}
                href='/tasks/create'>Create Task</Link>
            </div>
            <Table className={'mt-4'}>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                         <TableRow>
                             <TableHead>Task</TableHead>
                             <TableHead>File</TableHead>
                             <TableHead className="w-[100px]">Status</TableHead>
                             <TableHead className="w-[100px]">Due Date</TableHead>
                             <TableHead className="w-[150px] text-right">Actions</TableHead>
                         </TableRow>
                     </TableHeader>
                <TableBody>

                        {tasks.data.map((task:Task) =>(
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.name}</TableCell>
                                <TableCell>{
                                     !task.mediaFile
                                         ? ''
                                         : (
                                             <a href={task.mediaFile.original_url} target="_blank">
                                                 <img src={task.mediaFile.original_url} className={'w-8 h-8'} />
                                             </a>
                                         )
                                 }
                                 </TableCell>
                                <TableCell className={task.is_completed ? 'text-green-600' : 'text-red-700'}>
                                     {task.is_completed ? 'Completed' : 'In Progress'}
                                </TableCell>
                                <TableCell>{task.due_date ? format(task.due_date, 'PPP') : ''}</TableCell>
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
            <TablePagination resource={tasks}/>

        </AppLayout>
    )
}

export default Index
