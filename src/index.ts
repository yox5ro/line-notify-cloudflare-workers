interface Env {
	LINE_NOTIFY_API_TOKEN: string;
	LINE_NOTIFY_API_URL: string;
	THE_CAT_API_URL: string;
	BOBOBO_IMAGE_URL: string;
}

type LINENotifyResponse = {
	status: number;
	message: string;
};

const notifyLINE = async (
	env: Env,
	message: string,
	imageThumbnail: string,
	imageFullsize: string,
) => {
	const response = await fetch(`${env.LINE_NOTIFY_API_URL}notify`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Bearer ${env.LINE_NOTIFY_API_TOKEN}`,
		},
		body: new URLSearchParams({
			message,
			imageThumbnail,
			imageFullsize,
		}),
	});
	const json = (await response.json()) as LINENotifyResponse;
	if (json.status !== 200) {
		throw new Error(json.message);
	}
};

type TheCatResponse = {
	id: string;
	url: string;
	width: number;
	height: number;
};

const fetchCatImage = async (env: Env): Promise<string> => {
	const response = await fetch(`${env.THE_CAT_API_URL}images/search`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const json = (await response.json()) as TheCatResponse[];
	return json[0].url;
};

const generateRandomStringFromArray = (
	inputArray: string[],
	count: number,
): string => {
	let randomString = "";
	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * inputArray.length);
		randomString += inputArray[randomIndex];
	}
	return randomString;
};

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
		const words = ["ボ", "・ボ", "ーボ"];
		const message = generateRandomStringFromArray(words, 7);
		const imageUrl =
			message === "ボボボーボ・ボーボボ"
				? env.BOBOBO_IMAGE_URL
				: await fetchCatImage(env);
		await notifyLINE(env, message, imageUrl, imageUrl);
	},
};
