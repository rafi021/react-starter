import { TablePagination } from '@/components/table-pagination';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedResponse, type TaskCategory } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Tasks Categories', href: '/task-categories' },
];

const Index = ({ taskCategories }: { taskCategories: PaginatedResponse<TaskCategory> }) => {
    const deleteTaskCategory = (taskCategory: TaskCategory) => {
        // Delete the task category from the server
        if (taskCategory.tasks_count === 0) {
            if (confirm('Are you sure you want to delete this task category?')) {
                router.delete(route('task-categories.destroy', taskCategory.id));
                toast.success('Task Category deleted successfully');
            }
        } else {
            if (
                confirm(
                    'This category has tasks assigned to it. Are you sure you want to delete it? This will also delete all the tasks assigned to this category.',
                )
            ) {
                router.delete(route('task-categories.destroy', taskCategory.id));
                toast.success('Task Category deleted successfully');
            }
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category List" />
            <div className="mt-8">
                <div className={'flex flex-row gap-x-4'}>
                    <Link className={buttonVariants({ variant: 'default' })} href="/tasks/create">
                        Create Task
                    </Link>
                    <Link className={buttonVariants({ variant: 'ghost' })} href="/task-categories/create">
                        Create Category
                    </Link>
                    <Link className={buttonVariants({ variant: 'outline' })} href="/task-categories">
                        Manage Task Categories
                    </Link>
                </div>
                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Assigned Tasks</TableHead>
                            <TableHead className="w-[150px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taskCategories.data.map((taskCategory: TaskCategory) => (
                            <TableRow key={taskCategory.id}>
                                <TableCell className="font-medium">{taskCategory.name}</TableCell>
                                <TableCell className="font-medium">{taskCategory.tasks_count}</TableCell>
                                <TableCell className="flex flex-row gap-x-2 text-right">
                                    <Link className={buttonVariants({ variant: 'default' })} href={`/task-categories/${taskCategory.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTaskCategory(taskCategory)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination resource={taskCategories} />
            </div>
        </AppLayout>
    );
};

export default Index;
