type requestBody = {
  workTime: number;
  breakTime: number;
};

let workTime: number;
let breakTime: number;

export async function GET(req: Request) {
  return Response.json({ workTime: workTime, breakTime: breakTime });
}

export async function POST(req: Request) {
  const body = (await req.json()) as requestBody;

  workTime = body.workTime;
  breakTime = body.breakTime;

  return Response.json({ workTime: workTime, breakTime: breakTime });
}
