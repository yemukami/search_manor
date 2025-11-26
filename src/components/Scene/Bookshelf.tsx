import { Box } from '@react-three/drei';
import { useSearchStore, BookData } from '@/lib/store';
import { Book } from './Book';

export const Bookshelf = () => {
    const { results, setSelectedBook } = useSearchStore();

    // Simple layout logic
    // Shelf dimensions: Width ~5.8, 3 shelves at Y=1, 2, 3.
    // Book thickness: 0.05 + gap 0.01 = 0.06
    // Capacity per shelf: 5.8 / 0.06 ~ 96 books.

    const SHELF_WIDTH = 5.0; // Usable width
    const START_X = -SHELF_WIDTH / 2;
    const BOOK_SPACING = 0.08;
    const SHELVES_Y = [3.125, 2.125, 1.125]; // Adjusted for book height sitting on shelf (Shelf Y + Book Height/2)
    // Shelf Y in Bookshelf.tsx was 1, 2, 3 (center of shelf board).
    // Shelf board thickness 0.1. Top surface is at Y + 0.05.
    // Book height 0.25. Center is at 0.125.
    // So Y = ShelfY + 0.05 + 0.125 = ShelfY + 0.175.
    // Shelf 1 (top): Y=3. Surface 3.05. Book Y=3.175.
    // Shelf 2: Y=2. Surface 2.05. Book Y=2.175.
    // Shelf 3: Y=1. Surface 1.05. Book Y=1.175.

    const renderBooks = () => {
        return results.map((book, index) => {
            const booksPerShelf = Math.floor(SHELF_WIDTH / BOOK_SPACING);
            const shelfIndex = Math.floor(index / booksPerShelf);
            const bookIndexOnShelf = index % booksPerShelf;

            if (shelfIndex >= SHELVES_Y.length) return null; // Overflow

            const x = START_X + bookIndexOnShelf * BOOK_SPACING;
            const y = SHELVES_Y[shelfIndex] + 0.05; // +0.05 tweak
            const z = 0; // Relative to bookshelf group

            return (
                <Book
                    key={book.id}
                    data={book}
                    position={[x, y, z]}
                    onClick={setSelectedBook}
                />
            );
        });
    };

    return (
        <group position={[0, 0, -2]}>
            {/* Main Frame */}
            <Box args={[6, 4, 0.5]} position={[0, 2, 0]} receiveShadow castShadow>
                <meshStandardMaterial color="#2a1b0e" />
            </Box>

            {/* Shelves */}
            <Box args={[5.8, 0.1, 0.4]} position={[0, 1, 0.1]} receiveShadow castShadow>
                <meshStandardMaterial color="#3d2817" />
            </Box>
            <Box args={[5.8, 0.1, 0.4]} position={[0, 2, 0.1]} receiveShadow castShadow>
                <meshStandardMaterial color="#3d2817" />
            </Box>
            <Box args={[5.8, 0.1, 0.4]} position={[0, 3, 0.1]} receiveShadow castShadow>
                <meshStandardMaterial color="#3d2817" />
            </Box>

            {/* Books */}
            <group position={[0, 0, 0.15]}>
                {/* Offset Z to align with shelf front/depth. Shelf depth 0.4. Center 0.1. Front 0.3. Back -0.1.
            Books depth 0.2. 
        */}
                {renderBooks()}
            </group>
        </group>
    );
};
