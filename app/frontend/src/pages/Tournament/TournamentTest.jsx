import React, { useState, useEffect } from 'react';
import useAuth from '../../context/AuthContext';

const TournamentTest = () => {
    const [users, setUsers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [socket, setSocket] = useState(null);
    const { getAuthHeaders } = useAuth();

    useEffect(() => {
        // Fetch existing users
        fetch('http://127.0.0.1:8000/api/userss/', {
            method: 'GET',
            headers: getAuthHeaders(),
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Error fetching users:', err));

        // Fetch existing tournaments
        fetch('/api/tournaments/')
            .then(res => res.json())
            .then(data => setTournaments(data))
            .catch(err => console.error('Error fetching tournaments:', err));
    }, []);

    console.log('users ===>', users);
    const createTournament = async () => {
        // Select 4 users for the tournament
        console.log('users ===>', users);
        const selectedUsers = users?.slice(1, 5).map(user => user.id);
        console.log('selectedUsers ===>', selectedUsers);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/tournament/', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: `Tournament ${tournaments.length + 1}`,
                    users: selectedUsers
                })
            });

            const newTournament = await response.json();
            setTournaments([...tournaments, newTournament]);
            setSelectedTournament(newTournament.id);
            connectWebSocket(newTournament.id);
        } catch (error) {
            console.error('Error creating tournament:', error);
        }
    };

    const connectWebSocket = (tournamentId) => {
        if (socket) {
            socket.close();
        }

        const ws = new WebSocket(`ws://${window.location.host}/ws/tournament/${tournamentId}/`);

        ws.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket message:', data);
            // Update tournament data in UI
            setTournaments(prevTournaments =>
                prevTournaments.map(t =>
                    t.id === tournamentId ? { ...t, ...data.tournament } : t
                )
            );
        };

        setSocket(ws);
    };

    const updateMatch = (matchId, scores) => {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                action: 'update_match',
                match_data: {
                    match_id: matchId,
                    ...scores,
                    complete: true
                }
            }));
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tournament Testing Panel</h2>

                {/* Create Tournament Button */}
                <button
                    onClick={createTournament}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New Tournament
                </button>

                {/* Tournament List */}
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Existing Tournaments</h3>
                    <div className="space-y-2">
                        {tournaments.map(tournament => (
                            <div
                                key={tournament.id}
                                className="border p-4 rounded cursor-pointer hover:bg-gray-50"
                                onClick={() => {
                                    setSelectedTournament(tournament.id);
                                    connectWebSocket(tournament.id);
                                }}
                            >
                                <h4 className="font-medium">{tournament.name}</h4>
                                <p>Status: {tournament.status}</p>
                                {tournament.winner && (
                                    <p className="text-green-600">Winner: {tournament.winner}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Tournament Details */}
                {selectedTournament && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Tournament Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {tournaments
                                .find(t => t.id === selectedTournament)
                                ?.matches?.map(match => (
                                    <div key={match.id} className="border p-4 rounded">
                                        <p>Round {match.round_number}</p>
                                        <div className="flex justify-between items-center my-2">
                                            <span>{match.player1}</span>
                                            <input
                                                type="number"
                                                className="w-16 border rounded px-2 py-1"
                                                defaultValue={match.player1_score}
                                                onChange={(e) => {
                                                    updateMatch(match.id, {
                                                        player1_score: parseInt(e.target.value),
                                                        player2_score: match.player2_score
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center my-2">
                                            <span>{match.player2}</span>
                                            <input
                                                type="number"
                                                className="w-16 border rounded px-2 py-1"
                                                defaultValue={match.player2_score}
                                                onChange={(e) => {
                                                    updateMatch(match.id, {
                                                        player1_score: match.player1_score,
                                                        player2_score: parseInt(e.target.value)
                                                    });
                                                }}
                                            />
                                        </div>
                                        {match.winner && (
                                            <p className="text-green-600 mt-2">
                                                Winner: {match.winner}
                                            </p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentTest;