import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 60,
                    color: 'black',
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    paddingTop: 0,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: 1200,
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 600,
                        }}
                    >
                        <h1 style={{ fontSize: 60, color: 'black', textAlign: 'center' }}>
                            Test
                        </h1>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}