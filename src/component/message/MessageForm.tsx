import {useForm} from 'react-hook-form';

type MessageFormProps = {
    onSubmit: (data) => void
}

export function MessageForm({onSubmit}: MessageFormProps) {
    const {register, handleSubmit, reset} = useForm();
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
