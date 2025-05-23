import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

type CreateTaskCategoryForm  = {
    name?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Dashboard', href: '/dashboard'},
    {title: 'Tasks', href: '/tasks'},
    {title: 'Tasks Categories', href: '/tasks-categories'},
    {title: 'Create', href: '/tasks-categories/create'},
];

const Create = () => {
    const taskCategoryName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing, progress } = useForm<Required<CreateTaskCategoryForm >>({
        name: '',
    });

    const createTaskCategory: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('task-categories.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    taskCategoryName.current?.focus();
                }
            }
        })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Create Task' />
            <div className="flex h-full flex-1 flex-col gap-4 rounde-xl p-4">
                <form onSubmit={createTaskCategory} className='space-y-6'>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input id='name'
                            ref={taskCategoryName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className='mt-1 block w-full'
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}

export default Create
