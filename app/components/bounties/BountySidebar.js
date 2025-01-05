"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { decode, encode } from "html-entities";
import { useWordpress } from "../../providers/WordpressProvider";
import QuestCard from "./QuestCard";

export default function BountySidebar({ bounty }) {
    return (
        <div className="md:block hidden relative">
            <div className="sticky top-20 pr-40">
                <h3 className="text-2xl font-bold mb-2">Found in Quest</h3>
                <h3 className="text-xl font-bold mb-2">Software</h3>
                <h3 className="text-xl font-bold mb-2">Services</h3>

            </div>
        </div>
    );
}