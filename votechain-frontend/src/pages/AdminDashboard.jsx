import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Calendar, UserPlus, Trash } from "lucide-react";
import toast from "react-hot-toast";

import { createElection, createCandidate } from "../services/apiAdminElections";

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [candidates, setCandidates] = useState([]);
  const [candFirstName, setCandFirstName] = useState("");
  const [candLastName, setCandLastName] = useState("");
  const [candParty, setCandParty] = useState("");
  const [candDesc, setCandDesc] = useState("");

  const handleAddCandidateToLocalList = () => {
    if (!candFirstName || !candLastName || !candParty) {
      return toast.error("Numele, prenumele și partidul sunt obligatorii.");
    }

    const newCandidate = {
      id: Date.now(),
      firstName: candFirstName,
      lastName: candLastName,
      party: candParty,
      description: candDesc,
    };

    setCandidates([...candidates, newCandidate]);

    setCandFirstName("");
    setCandLastName("");
    setCandParty("");
    setCandDesc("");
    toast.success("Candidat adăugat în listă!");
  };

  const handleRemoveCandidateFromLocalList = (id) => {
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  const createElectionMutation = useMutation({
    mutationFn: async (formData) => {
      const electionResult = await createElection(formData.election);

      const newElectionId = electionResult.data.tour._id;

      const candidatePromises = formData.candidates.map((c) => {
        const { id, ...candidateData } = c;
        return createCandidate(newElectionId, candidateData);
      });

      await Promise.all(candidatePromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["elections"]);
      toast.success(
        "Evenimentul electoral și candidații au fost publicați cu succes!",
      );

      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setCandidates([]);
    },
    onError: (err) => {
      toast.error(err.message || "A apărut o eroare la salvarea pachetului.");
    },
  });

  const handleSubmitFinal = (e) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate) {
      return toast.error("Completează toate datele alegerilor.");
    }
    if (candidates.length < 2) {
      return toast.error(
        "Sistemul necesită cel puțin 2 candidați pentru o alegere.",
      );
    }
    if (new Date(startDate) >= new Date(endDate)) {
      return toast.error(
        "Data de încheiere trebuie să fie după data de început.",
      );
    }

    createElectionMutation.mutate({
      election: { title, description, startDate, endDate, active: false },
      candidates: candidates,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-8 font-sans">
      {/* Header Dashboard */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight uppercase">
          Admin <span className="text-blue-500">Voting Control</span>
        </h1>
        <p className="text-sm text-gray-400 font-mono mt-1">
          Sistem de management securizat pentru procesul electoral.
        </p>
      </div>

      {/* COLOANA 1: Formularul de Creare */}
      <div className="lg:col-span-1 bg-[#121620]/60 border border-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl h-fit">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="text-blue-400 w-5 h-5" />
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-200">
            Creează Alegeri
          </h2>
        </div>

        <form onSubmit={handleSubmitFinal} className="space-y-6">
          {/* SECȚIUNEA 1: Datele Alegerilor */}
          <div className="bg-[#121620]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-5 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 1. Configurare Eveniment
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 pl-1">
                  Titlu Eveniment
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Alegeri Prezidențiale 2026"
                  className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 pl-1">
                  Descriere
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Regulamentul sau descrierea acestui scrutin..."
                  rows="3"
                  className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 resize-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 pl-1">
                    Dată Început
                  </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 pl-1">
                    Dată Încheiere
                  </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECȚIUNEA 2: Candidați */}
          <div className="bg-[#121620]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> 2. Înscriere Candidați
              </h2>
              <span className="text-xs font-mono text-gray-500">
                Total: {candidates.length}
              </span>
            </div>

            {/* Sub-formularul pentru adăugare candidat */}
            <div className="p-4 bg-[#1A1F2C]/50 border border-white/5 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Prenume"
                  value={candFirstName}
                  onChange={(e) => setCandFirstName(e.target.value)}
                  className="bg-[#1A1F2C] border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
                />
                <input
                  type="text"
                  placeholder="Nume de Familie"
                  value={candLastName}
                  onChange={(e) => setCandLastName(e.target.value)}
                  className="bg-[#1A1F2C] border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
                />
                <input
                  type="text"
                  placeholder="Partid Politic"
                  value={candParty}
                  onChange={(e) => setCandParty(e.target.value)}
                  className="bg-[#1A1F2C] border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Scurtă descriere / Slogan (opțional)"
                  value={candDesc}
                  onChange={(e) => setCandDesc(e.target.value)}
                  className="flex-1 bg-[#1A1F2C] border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
                />
                <button
                  type="button"
                  onClick={handleAddCandidateToLocalList}
                  className="bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1 min-w-[120px]"
                >
                  <Plus className="w-4 h-4" /> Adaugă
                </button>
              </div>
            </div>

            {/* Lista candidaților pregătiți */}
            {candidates.length > 0 && (
              <div className="space-y-2 mt-4">
                {candidates.map((c, index) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between bg-[#1A1F2C]/80 border border-white/5 px-4 py-3 rounded-xl hover:border-blue-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-200">
                          {c.firstName} {c.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{c.party}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidateFromLocalList(c.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Butonul Final de Salvare */}
          <button
            type="submit"
            disabled={createElectionMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2"
          >
            {createElectionMutation.isPending ? (
              <span className="animate-pulse">
                Se procesează pachetul electoral...
              </span>
            ) : (
              "Lansează Alegerile"
            )}
          </button>
        </form>
      </div>

      {/* COLOANA 2 & 3: Lista și Controlul Alegerilor */}
    </div>
  );
}
