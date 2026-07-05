#!/usr/bin/env bash
cd "c:/UNISA___RECLAIMING_AFRICAN_VOICES___hacathon/design"
src="The-Sound-of-Ancient-Africa-Powerful.mp3"
dur=45
hop=12
end=2412
fo=$((dur-2))
i=1
for s in $(seq 0 $hop $end); do
  out=$(printf "clips/clip-%03d.mp3" "$i")
  ffmpeg -y -v error -ss "$s" -t "$dur" -i "$src" \
    -af "afade=t=in:st=0:d=1.5,afade=t=out:st=${fo}:d=2,loudnorm=I=-16:TP=-1.5:LRA=11" \
    -c:a libmp3lame -q:a 3 "$out"
  i=$((i+1))
done
echo "DONE: $((i-1)) clips"
