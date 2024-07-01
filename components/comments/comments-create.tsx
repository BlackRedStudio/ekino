import { useState } from 'react';

import FormField from '../form-field';
import { Textarea } from '../ui/textarea';
import StarRating from "../star-rating";
import { Button } from "../ui/button";
import FormError from "../ui/form-error";

type TProps = {
	addComment: () => void;
};

export default function CommentsCreate({ addComment }: TProps) {
	const [content, setContent] = useState('');
	const [rating, setRating] = useState(0);

	return (
		<div className="space-y-2">
			<FormField label="Twój komentarz:">
				<Textarea
					placeholder="Wpisz swój komentarz"
					id="content"
					name="content"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
			</FormField>
            <p className="text-white">Oceń film w skali od 1 do 10:</p>
            <div className="items-center md:flex flex-wrap justify-between">
                <StarRating
                    rating={rating}
                    setRating={rating => setRating(rating)}
                    hints
                />
                <Button className="relative">
                    Dodaj komentarz
                </Button>
                <div className="w-full">
                    <FormError />
                </div>
            </div>
		</div>
	);
}
