import {useForm} from 'react-hook-form';

export type FormData = {
    message: string
}
type MessageFormProps = {
    onSubmit: (data: FormData) => void
}

export function MessageForm({onSubmit}: MessageFormProps) {
    const {register, handleSubmit, reset} = useForm<FormData>();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Message</label>
                <textarea
                    rows={4}
                    cols={50}
                    {...register('message', {required: true})}
                />
            </div>
            <button type="submit" className={"sendMessageButton"}>Send Message</button>
        </form>
    );
}
